export interface IAthletePlain {
    username: string;
    name: string;
    lastName: string;
    alias: string | null;
    sex: "M" | "F";
    isCoach: boolean;
    tall: number;
    weight: number;
    country: "CO";
    birthdate: string;
    category: number;
    verified: string | null;
    data: { rms: any[] };
  }

  export interface IAthlete {
    username: string;
    name: string;
    lastName: string;
    alias: string | null;
    sex: "M" | "F";
    isCoach: boolean;
    tall: number;
    weight: number;
    country: "CO";
    birthdate: Date;
}