import React, { useEffect, useState } from "react";
import { Edit, Trash2, Upload } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold mb-1">{label}</label>
    <input
      {...props}
      className="bg-transparent border border-gray-500 rounded-lg px-3 py-2 outline-none focus:border-white"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold mb-1">{label}</label>
    <textarea
      {...props}
      rows={4}
      className="bg-transparent border border-gray-500 rounded-lg px-3 py-2 outline-none focus:border-white"
    />
  </div>
);

const MultiImageUpload = ({ images, onChange, onRemove }) => (
  <div>
    <label className="text-sm font-semibold mb-2 block">Images</label>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      <label className="flex flex-col items-center justify-center gap-2 cursor-pointer border border-dashed border-gray-500 rounded-lg h-32 text-sm text-gray-300 hover:border-white transition">
        <Upload size={20} />
        <span>Add images</span>
        <input type="file" hidden multiple onChange={onChange} />
      </label>

      {images.map((img, index) => (
        <div key={index} className="relative group">
          <img
            src={img instanceof File ? URL.createObjectURL(img) : img.url}
            alt="preview"
            className="w-full h-32 object-cover rounded-lg"
          />
          <button
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  </div>
);

const GalleryCollegeDetailPage = () => {
  const api = new ApiService();
  const navigator = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const mode = location.state?.mode || "add";
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");

  const [collegeData, setCollegeData] = useState({
    cityId: null,
    collegeId: null,
    mediaId: null,

    city: "",
    collegeName: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_ADD_CITY);
        setCities(res?.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch cities", err);
      }
    };
    fetchCities();
  }, []);

  const handleCollegeChange = (e) => {
    const { name, value } = e.target;
    setCollegeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (e) => {
    setCollegeData((prev) => ({ ...prev, cityId: e.target.value }));
  };

  const handleCollegeImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setCollegeData((prev) => ({
      ...prev,
      images: [...files, ...prev.images],
    }));
  };

  const removeCollegeImage = (i) => {
    setCollegeData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== i),
    }));
  };

  // ---------------- EDIT FETCH ----------------
  useEffect(() => {
    if (!isEdit || !id) return;

    const fetchById = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_GET_COLLEGES_BY_ID + id);
        const data = res?.data?.data;

        setCollegeData({
          cityId: data.city?.id || null,
          collegeId: data.id || null,
          mediaId: data.images?.[0]?.id || null,

          city: data.city?.name || "",
          collegeName: data.name || "",
          description: data.images?.[0]?.description || "",
          images: data.images || [],
        });
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    fetchById();
  }, [isEdit, id]);

  // ---------------- ADD COLLEGE ----------------
  const handleAddCollege = async () => {
    try {
      let cityId = collegeData.cityId;

      if (newCity) {
        const cityRes = await api.apipost(ServerUrl.API_ADD_CITY, {
          name: newCity,
        });
        cityId = cityRes?.data?.data?.id;
      }

      if (!cityId) return alert("City required");

      const collegeRes = await api.apipost(ServerUrl.API_ADD_COLLEGE, {
        name: collegeData.collegeName,
        cityId,
      });

      const collegeId = collegeRes?.data?.data?.id;

      if (collegeData.images.length) {
        const formData = new FormData();
        formData.append("collegeId", collegeId);
        formData.append("description", collegeData.description);

        collegeData.images.forEach((img) => {
          if (img instanceof File) formData.append("file", img);
        });

        await api.apipost(ServerUrl.API_UPLOAD_IMAGE, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("College Added");
      navigator(-1);
    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  };

  // ---------------- UPDATE ----------------
  const handleUpdateCollege = async () => {
    try {
      if (collegeData.cityId) {
        await api.apiput(ServerUrl.API_UPDATE_CITY + collegeData.cityId, {
          name: collegeData.city,
        });
      }

      if (collegeData.collegeId) {
        await api.apiput(ServerUrl.API_UPDATE_COLLEGE + collegeData.collegeId, {
          name: collegeData.collegeName,
          cityId: collegeData.cityId,
        });
      }

      if (collegeData.mediaId) {
        const formData = new FormData();
        formData.append("description", collegeData.description);
        formData.append("collegeId", collegeData.collegeId);

        collegeData.images.forEach((img) => {
          if (img instanceof File) formData.append("file", img);
        });

        await api.apiput(
          ServerUrl.API_UPDATE_MEDIA + collegeData.mediaId,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      alert("Updated");
      navigator(-1);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // ---------------- DELETE ----------------
  const handleDeleteCollege = async () => {
    try {
      if (collegeData.mediaId)
        await api.apidelete(ServerUrl.API_DELETE_MEDIA + collegeData.mediaId);

      if (collegeData.collegeId)
        await api.apidelete(ServerUrl.API_DELETE_COLLEGE + collegeData.collegeId);

      alert("Deleted");
      navigator(-1);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-2xl sm:text-3xl text-white font-semibold">
            College
          </h1>

          {isEdit && (
            <div className="flex gap-4">
              <button onClick={handleUpdateCollege} className="bg-white p-2 rounded">
                <Edit size={20} color="orange" />
              </button>

              <button onClick={handleDeleteCollege} className="bg-white p-2 rounded">
                <Trash2 size={20} color="orange" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select
              value={collegeData.cityId || ""}
              onChange={handleCityChange}
              className="bg-three border border-gray-500 rounded-lg px-3 py-2 outline-none focus:border-white"
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <Input
              label="College Name"
              name="collegeName"
              value={collegeData.collegeName}
              onChange={handleCollegeChange}
            />
          </div>

          <Textarea
            label="Description"
            name="description"
            value={collegeData.description}
            onChange={handleCollegeChange}
          />

          <MultiImageUpload
            images={collegeData.images}
            onChange={handleCollegeImagesUpload}
            onRemove={removeCollegeImage}
          />
        </div>

        {isAdd && (
          <button
            onClick={handleAddCollege}
            className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default GalleryCollegeDetailPage;
