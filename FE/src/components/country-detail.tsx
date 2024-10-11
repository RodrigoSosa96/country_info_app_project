"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui";

interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
}

interface PopulationData {
  year: number;
  value: number;
}

interface CountryData {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: BorderCountry[];
  population: PopulationData[];
}

export default function CountryDetail({ country }: { country: CountryData }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center">
        <Image
          src={`https://flagcdn.com/w160/${country.countryCode.toLowerCase()}.png`}
          alt={`${country.commonName} flag`}
          width={80}
          height={53}
          className="mr-4"
        />
        <div>
          <h1 className="text-4xl font-bold">{country.commonName}</h1>
          <p className="text-xl text-muted-foreground">
            {country.officialName}
          </p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Border Countries</CardTitle>
          <CardDescription>
            Countries that share a border with {country.commonName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {country.borders.map((border) => (
              <Link
                key={border.countryCode}
                href={`/countries/${border.countryCode.toUpperCase()}`}
              >
                <Badge
                  variant="secondary"
                  className="cursor-pointer transition-colors hover:bg-secondary-foreground hover:text-secondary"
                >
                  {border.commonName}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Population Over Time</CardTitle>
          <CardDescription>
            {country.commonName}&apos;s population from{" "}
            {country.population?.[0]?.year ?? "N/A"} to{" "}
            {country.population?.[country.population.length - 1]?.year ?? "N/A"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              population: {
                label: "Population",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={country.population}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Population"
                  stroke="var(--color-population)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
