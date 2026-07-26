type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-black uppercase tracking-normal text-ugandaRed">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black text-ink md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-ink/65">{description}</p> : null}
    </div>
  );
}
