type PageHeadingProps = {
    title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
    return <h1 className="text-4xl mb-5 font-semibold">{title}</h1>;
}
