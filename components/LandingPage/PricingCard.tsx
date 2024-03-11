import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Link from "next/link";

type PricingCardProps = {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonDisabled?: boolean;
  features: { icon: JSX.Element; text: string }[];
  highlight?: boolean;
};

export default function PricingCard({
  title,
  subtitle,
  price,
  description,
  buttonText,
  buttonLink,
  buttonDisabled = false,
  features,
  highlight = false,
}: PricingCardProps) {
  return (
    <Card
      className={`shadow-xl ${highlight ? "ring-2 ring-primary" : ""}`}
      shadow="none"
    >
      <CardBody className="px-5">
        <div className="flex-none">
          <h4
            className={`font-semibold gap-3 text-xl ${highlight ? "text-primary" : ""}`}
          >
            {title}
          </h4>
          <p className="text-zinc-500 text-sm mb-5">{subtitle}</p>
          <h4 className="text-4xl font-semibold">{price}</h4>
          <p className="mb-5 text-zinc-500 text-sm">{description}</p>

          <Button
            isDisabled={buttonDisabled}
            color={highlight ? "primary" : "default"}
            size="sm"
            as={Link}
            href={buttonLink}
            className="mb-5"
          >
            <IconPlayerPlayFilled size={18} /> {buttonText}
          </Button>
          <ul className="space-y-2 text-sm">
            {features.map((feature, index) => (
              <li key={index} className="flex gap-3 items-center">
                {feature.icon}
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}
