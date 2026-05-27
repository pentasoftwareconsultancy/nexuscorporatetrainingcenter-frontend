import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import toast from "react-hot-toast";
import Button from "../../components/common/Button";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "nexusCTC2020@gmail.com",
    href: "mailto:nexusCTC2020@gmail.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 9545450788 / +91 9545450677",
    href: "tel:+919545450788",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/18–21/24, BRTS Road, Pimple Saudagar, Pune – 411027",
    href: null,
  },
];

const terms = [
  { title: "Non-Refundable Fees", desc: "The fees will be non-refundable and non-transferable in any circumstances." },
  { title: "No Batch Change", desc: "Batch or course change is not allowed once enrolled." },
  { title: "Syllabus", desc: "Training will be provided according to the specified syllabus only." },
  { title: "Placement Support", desc: "Candidates will receive interview calls from different job portals." },
  { title: "Course Materials", desc: "Materials are proprietary and should not be distributed without permission." },
  { title: "Certification", desc: "Provided only after meeting attendance and assessment requirements." },
  { title: "Data Privacy", desc: "All personal information collected will be kept confidential and used for official purposes only." },
  { title: "Professional Conduct", desc: "All candidates are expected to maintain professional behavior during training." },
  { title: "Technical Requirements", desc: "Candidates must ensure access to necessary hardware and software for online sessions." },
  { title: "Support", desc: "For any queries, contact us at nexusCTC2020@gmail.com." },
];

export default function ContactPage() {
  const api = new ApiService();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.apipost(`${ServerUrl.API_POST_CONTACT_FORM}`, formData);
      if (res?.data?.success) toast.success("Message sent successfully!");
      else toast.success("Form Sent.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("❌ Contact Form Error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sora overflow-hidden">

      {/* ── TOP ARC GLOW ── */}
      <div className="pointer-events-none absolute top-0 left-0 w-full z-0" style={{height:"180px",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:"-120px",left:"50%",transform:"translateX(-50%)",width:"85%",height:"320px",borderRadius:"50%",boxShadow:"0 0 100px 50px rgba(130,30,0,0.15)"}} />
        <div style={{position:"absolute",bottom:"-120px",left:"50%",transform:"translateX(-50%)",width:"75%",height:"290px",borderRadius:"50%",boxShadow:"0 0 4px 1px rgba(255,160,40,1), 0 0 10px 3px rgba(255,85,0,0.8), 0 0 22px 6px rgba(200,50,0,0.4)"}} />
        {/* Fade left end */}
        <div style={{position:"absolute",top:0,left:0,width:"30%",height:"100%",background:"linear-gradient(to right, #0C0C0C 40%, transparent)"}} />
        {/* Fade right end */}
        <div style={{position:"absolute",top:0,right:0,width:"30%",height:"100%",background:"linear-gradient(to left, #0C0C0C 40%, transparent)"}} />
      </div>

      {/* ── BOTTOM SUNRISE GLOW ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[320px] z-0"
        style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255,90,0,0.6) 0%, rgba(200,50,0,0.3) 35%, rgba(100,20,0,0.1) 60%, transparent 80%)" }}
      />

      {/* ── HERO ── */}
      <div className="relative pt-24 pb-12 px-6 text-center z-10">
        <span className="inline-block px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium tracking-widest uppercase mb-5">
          Contact Us
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Let's <span className="text-orange-500">Connect</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Have questions or ready to transform your career with{" "}
          <span className="text-white font-medium">Nexus Corporate Training Center LLP</span>?
          We're here to help.
        </p>
      </div>

      {/* ── CONTACT INFO CARDS ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="group bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/25 transition-all duration-300">
                <Icon size={18} className="text-orange-400" />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{label}</p>
              {href ? (
                <a href={href} className="text-gray-200 text-sm leading-relaxed hover:text-orange-400 transition-colors duration-200 break-all">
                  {value}
                </a>
              ) : (
                <p className="text-gray-200 text-sm leading-relaxed">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── FORM SECTION ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Left — Info */}
          <div className="lg:col-span-2 pt-2">
            <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
              Send Us a <span className="text-orange-500">Message</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            <div className="space-y-4">
              {["Response within 24 hours", "Expert career guidance", "Free consultation call"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-orange-500 shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white/3 border border-white/8 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Name</label>
                <input type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all duration-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Email</label>
                <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all duration-200" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Phone Number</label>
              <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all duration-200" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Message</label>
              <textarea name="message" placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange} required rows="5"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all duration-200 resize-none" />
            </div>
            <Button
              type="submit"
              text={loading ? "Sending..." : "Send Message →"}
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm gap-2 font-semibold justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </form>
        </div>
      </div>

      {/* ── TERMS & CONDITIONS ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="border-t border-orange-500/20 pt-14">

          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium tracking-widest uppercase mb-4">
              Legal
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Terms & <span className="text-orange-500">Conditions</span>
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">
              Please read the following terms carefully before enrolling in any of our programs.
            </p>
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {terms.map(({ title, desc }, i) => (
              <div key={i} className="group bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/15 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-500/25 transition-all duration-300">
                    <span className="text-orange-400 text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-white text-sm font-semibold">{title}</h3>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}


