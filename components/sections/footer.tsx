import { EVENT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#03113f] px-6 py-8 text-center text-[0.8rem] leading-[1.7] text-white/60">
      <div className="mx-auto max-w-xl">
        <b className="font-heading block text-[0.95rem] text-white">
          {EVENT.name}
        </b>
        <p>...raising kingdom entrepreneurs for influence and impact</p>
        <a
          href="https://kesummit.com.ng"
          className="font-heading text-gold-300 transition-colors hover:text-white"
        >
          kesummit.com.ng
        </a>
      </div>
    </footer>
  );
}
