"use server";
import { makeRequest } from "~/lib/axios";
import type { ActionResponse } from "./types";

type Country = {
  countryCode: string;
  name: string;
};

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

interface Province {
  name: string;
  code: string;
}

interface CountryData {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: BorderCountry[];
  population: PopulationData[];
  temperature: number;
  provinces: Province[];
}

const API_URL = process.env.API_URL;

export async function getAllCountries(): Promise<ActionResponse<Country[]>> {
  const data = await makeRequest<Country[]>(
    "GET",
    `${API_URL}/api/countries`,
  );
  return {
    success: true,
    data,
  };
}

export async function getCountryInfo(
  countryCode: string,
): Promise<ActionResponse<CountryData>> {
  const data = await makeRequest<CountryData>(
    "GET",
    `${API_URL}/api/countries/${countryCode}`,
  );
  return { success: true, data };
}
