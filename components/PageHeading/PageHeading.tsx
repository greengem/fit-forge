type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return <h1 className="text-4xl mb-6 mt-3 md:mt-8 font-semibold">{title}</h1>;
}
