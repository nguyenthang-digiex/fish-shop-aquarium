export default function Footer() {
  return (
    <footer className="border-slate-800 bg-gradient-to-br from-[#0f172a] via-[#0c1e3a] to-[#1e293b]">
      {/* PROMOTION */}
      <div className="bg-cyan-600 py-3 text-center text-sm text-white">
        🔥 Summer Reef Sale – Up to 30% OFF Coral Supplements
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-3">
        {/* STORE INFO */}
        <div>
          <h3 className="mb-4 font-semibold text-white">
            🐠 NEWBIE REEFER AQUAMARINE
          </h3>

          <p className="text-sm leading-relaxed text-sand">
            17/10 tổ 3 ấp 7
            <br />
            xã Xuân Thới Thượng, huyện Hóc Môn
            <br />
            TP Hồ Chí Minh
          </p>

          <p className="mt-4 text-sm text-sand">Phone: 0368 287 168</p>

          <p className="text-sm text-sand">Email: newbieaquarium@gmail.com</p>

          <a
            href="https://www.google.com/maps/place/nh%C3%A0+Th%E1%BB%8D+Th%E1%BA%AFng/@10.8514228,106.58452,883m"
            target="_blank"
            className="mt-4 inline-block text-sm text-cyan-400 hover:text-cyan-300"
          >
            Get Directions →
          </a>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Quick Links</h3>

          <ul className="space-y-2 text-sm text-sand">
            <li>
              <a className="hover:text-cyan-400">Shop</a>
            </li>
            <li>
              <a className="hover:text-cyan-400">Corals</a>
            </li>
            <li>
              <a className="hover:text-cyan-400">Fishes</a>
            </li>
            <li>
              <a className="hover:text-cyan-400">Reef Calculators</a>
            </li>
            <li>
              <a className="hover:text-cyan-400">Blog</a>
            </li>
          </ul>
        </div>

        {/* MAP */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Our Location</h3>

          <iframe
            src="https://maps.google.com/maps?q=10.8514228,106.5870949&z=15&output=embed"
            className="h-48 w-full rounded-lg border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
      {/* PAYMENT */}
      <div className="border-t border-slate-800 pb-4 pt-6 text-center">
        <div className="flex justify-center gap-4">
          <span className="text-sm text-sand">Visa</span>
          <span className="text-sm text-sand">MasterCard</span>
          <span className="text-sm text-sand">Bank Transfer</span>
          <span className="text-sm text-sand">COD</span>
        </div>

        {/* SOCIAL */}
        <div className="mt-4 flex justify-center gap-6 text-sm text-sand">
          <a className="hover:text-cyan-400">Facebook</a>
          <a className="hover:text-cyan-400">Instagram</a>
          <a className="hover:text-cyan-400">TikTok</a>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          © 2026 🐠 NEWBIE REEFER AQUAMARINE
        </p>
      </div>
    </footer>
  );
}
