import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";

import zeal1 from "../../assets/gallary/zeal1.avif";
import zeal2 from "../../assets/gallary/zeal2.avif";
import zeal3 from "../../assets/gallary/zeal3.avif";
import zeal4 from "../../assets/gallary/zeal4.avif";
import zeal5 from "../../assets/gallary/zeal5.avif";
import zeal6 from "../../assets/gallary/zeal6.avif";
import zeal7 from "../../assets/gallary/zeal7.avif";
import govtpoly1 from "../../assets/gallary/govtpoly1.avif";
import govtpoly2 from "../../assets/gallary/govtpoly2.avif";
import govtpoly3 from "../../assets/gallary/govtpoly3.avif";
import akola1 from "../../assets/gallary/akolaclg/Screenshot (81) 5.avif";
import akola2 from "../../assets/gallary/akolaclg/Screenshot (81) 8.avif";
import akola3 from "../../assets/gallary/akolaclg/Screenshot (81) 10.avif";
import akola4 from "../../assets/gallary/akolaclg/Screenshot (81) 11.avif";

const fallbackImages = [zeal1, zeal2, zeal3, zeal4, zeal5, zeal6, zeal7];

const GalleryCollegePage = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = new ApiService();
  const navigate = useNavigate();

  const fetchColleges = async () => {
    try {
      setLoading(true);

      const cityRes = await api.apiget(ServerUrl.API_GET_CITIES);
      const cities = cityRes?.data?.data || [];

      let all = [];

      for (const city of cities) {
        const collegeRes = await api.apiget(
          ServerUrl.API_GET_COLLEGES_BY_CITY + city.id
        );

        const list = collegeRes?.data?.data || [];

        const enriched = list.map((c) => ({
          ...c,
          cityId: city.id,
          cityName: city.name,
        }));

        all.push(...enriched);
      }

      const withImages = await Promise.all(
        all.map(async (college, index) => {
          try {
            const imgRes = await api.apiget(
              ServerUrl.API_GET_IMAGES_BY_COLLEGE + college.id
            );
            const dbImages = imgRes?.data?.data || [];
            
            const imagesToUse = dbImages.length > 0
              ? dbImages
              : (college.name?.toLowerCase().includes("government") || college.name?.toLowerCase().includes("govt") || college.id === 14 || college.id === 13
                ? [govtpoly1, govtpoly2, govtpoly3].map(url => ({ url }))
                : (college.name?.toLowerCase().includes("zeal") || college.id === 15 || college.id === 14
                  ? [zeal1, zeal2, zeal3, zeal4, zeal5, zeal6, zeal7].map(url => ({ url }))
                  : (college.name?.toLowerCase().includes("akola") || college.id === 2 || college.id === 1
                    ? [akola1, akola2, akola3, akola4].map(url => ({ url }))
                    : [fallbackImages[index % fallbackImages.length]].map(url => ({ url })))));

            return { ...college, images: imagesToUse };
          } catch {
            const imagesToUse = college.name?.toLowerCase().includes("government") || college.name?.toLowerCase().includes("govt") || college.id === 14 || college.id === 13
              ? [govtpoly1, govtpoly2, govtpoly3].map(url => ({ url }))
              : (college.name?.toLowerCase().includes("zeal") || college.id === 15 || college.id === 14
                ? [zeal1, zeal2, zeal3, zeal4, zeal5, zeal6, zeal7].map(url => ({ url }))
                : (college.name?.toLowerCase().includes("akola") || college.id === 2 || college.id === 1
                  ? [akola1, akola2, akola3, akola4].map(url => ({ url }))
                  : [fallbackImages[index % fallbackImages.length]].map(url => ({ url }))));
            return { ...college, images: imagesToUse };
          }
        })
      );

      setColleges(withImages);
    } catch (err) {
      console.error("College gallery fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <div className="w-full px-6">

      {loading ? (
        <p className="text-white mt-6">Loading…</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {colleges.map((album) => (
            <div
              key={album.id}
              onClick={() =>
                navigate(
                  ROUTES.ADMIN_EVENT_COLLEGE_EDIT.replace(":id", album.id),
                  { state: { mode: "edit", type: "college" } }
                )
              }
              className="cursor-pointer group"
            >
              <div className="relative aspect-square group-hover:scale-105 duration-500">
                <img
                  src={album.images?.[2]?.url}
                  className="absolute top-0 left-[10%] w-full h-full object-cover rounded-xl opacity-60 grayscale"
                />
                <img
                  src={album.images?.[1]?.url}
                  className="absolute top-0 left-[5%] w-full h-full object-cover rounded-xl opacity-80 grayscale"
                />
                <img
                  src={album.images?.[0]?.url}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                />
              </div>

              <p className="mt-4 text-lg text-white font-semibold">
                {album.name}
              </p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() =>
          navigate(ROUTES.ADMIN_EVENT_COLLEGE_ADD, {
            state: { mode: "add", type: "college" },
          })
        }
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full"
      >
        +
      </button>
    </div>
  );
};

export default GalleryCollegePage;
