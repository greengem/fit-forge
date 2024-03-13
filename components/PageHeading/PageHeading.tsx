type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return <h1 className="text-2xl md:text-4xl mb-6 font-semibold">{title}</h1>;
}
