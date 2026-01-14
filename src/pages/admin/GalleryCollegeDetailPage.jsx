import React, { useEffect, useState } from "react";
import { Edit, Trash2, Upload, Check } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import toast from "react-hot-toast";
import { useSingleClick } from "../../core";

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
  const singleClick = useSingleClick();

  const [cities, setCities] = useState([]);
  const [cityQuery, setCityQuery] = useState("");
  const filteredCities = cities.filter((c) =>
    c.name.toLowerCase().includes(cityQuery.toLowerCase())
  );
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
        const res = await api.apiget(ServerUrl.API_GET_ALL_MEDIA_GROUPS + id);
        const data = res?.data?.data;

        setCollegeData({
          cityId: data?.city?.id || null,
          collegeId: data?.id || null,
          mediaId: data?.images?.[0]?.id || null,

          city: data?.city?.name || "",
          collegeName: data?.name || "",
          description: data?.images?.[0]?.description || "",
          images: data?.images || [],
        });
        setCityQuery(data?.city?.name || "");
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    fetchById();
  }, [isEdit, id]);

  // ---------------- ADD MEDIA GROUP ----------------
  const handleAddCollege = async () => {
    try {
      if (!collegeData.city && !collegeData.cityId)
        return toast.error("City is required");
      if (!collegeData.collegeName) return toast.error("College name required");

      const formData = new FormData();

      // REQUIRED by backend
      formData.append("type", "media");

      // city: if user typed new city → use that
      // else use selected city's actual name
      formData.append("cityName", newCity || collegeData.city);

      formData.append("collegeName", collegeData.collegeName);

      // description + caption
      formData.append("description", collegeData.description || "");
      formData.append("caption", "College Event Pics"); // or bind from UI if needed

      // MULTIPLE FILES
      collegeData.images.forEach((img) => {
        if (img instanceof File) {
          formData.append("files", img);
        }
      });

      await api.apipostForm(ServerUrl.API_CREATE_MEDIA_GROUP, formData);

      toast.success("Gallery College Created Successfully");
      navigator(-1);
    } catch (err) {
      console.error("Create Failed", err);
      toast.error("Failed");
    }
  };

  // ---------------- UPDATE MEDIA GROUP ----------------
  const handleUpdateCollege = async () => {
    try {
      const formData = new FormData();

      formData.append("type", "media");
      formData.append("collegeId", collegeData.collegeId);
      formData.append("mediaId", collegeData.mediaId);
      formData.append("cityName", collegeData.city);
      formData.append("collegeName", collegeData.collegeName);
      formData.append("description", collegeData.description);

      collegeData.images.forEach((img) => {
        if (img instanceof File) formData.append("files", img);
      });

      await api.apiput(
        `${ServerUrl.API_UPDATE_MEDIA_GROUP}${collegeData.collegeId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Gallery College Updated Successfully");
      navigator(-1);
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Update Failed");
    }
  };

  // ---------------- DELETE ----------------
  const handleDeleteCollege = async () => {
    try {
      await api.apidelete(
        `${ServerUrl.API_DELETE_MEDIA_GROUP}${collegeData.collegeId}`
      );
      toast.success("Gallery College Deleted Successfully.");
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
              <button
                onClick={()=>singleClick(handleUpdateCollege)}
                className="bg-[#1a1a1a] p-4 rounded-full"
              >
                <Check size={20} />
              </button>

              <button
                onClick={()=>singleClick(handleDeleteCollege)}
                className="bg-[#1a1a1a] p-4 rounded-full"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className="text-sm font-semibold mb-1 block">City</label>

              <input
                type="text"
                value={cityQuery}
                placeholder="Type city..."
                onChange={(e) => {
                  const value = e.target.value;
                  setCityQuery(value);
                  setCollegeData((prev) => ({
                    ...prev,
                    cityId: null,
                    city: value, // store typed text
                  }));
                }}
                className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-2 outline-none focus:border-white"
              />

              {cityQuery.length > 0 && filteredCities.length > 0 && (
                <div className="absolute z-50 w-full bg-black border border-gray-600 rounded mt-1 max-h-40 overflow-y-auto">
                  {filteredCities.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setCityQuery(c.name);
                        setCollegeData((prev) => ({
                          ...prev,
                          cityId: c.id,
                          city: c.name,
                        }));
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-700"
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              )}

              {cityQuery.length > 0 && filteredCities.length === 0 && (
                <p className="text-xs text-green-400 mt-1">
                  No match found. New city will be created.
                </p>
              )}
            </div>

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
            onClick={()=>singleClick(handleAddCollege)}
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
