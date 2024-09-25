export class BirdDamageModel {
  id: number;
  id_owner: number;
  fbz: string;
  year: number;
  heron_number: number;
  heron_daily_food: number;
  heron_damage_in_euro_per_kg: number;
  heron_sum_price: number;
  komorantage_number: number;
  komorantage_daily_food: number;
  komorantage_damage_in_euro_per_kg: number;
  komorantage_sum_price: number;
  number_of_seedlings: number;
  damage_of_seedlings: number;
  amount_of_injured_kg: number;
  damage_amount_of_injured: number;
  nest_and_sleeping: NestAndSleepingModule[] = [new NestAndSleepingModule()];
  requested_for_next_year: RequestedForNextYear[] = [
    new RequestedForNextYear(),
  ];
}

export class NestAndSleepingModule {
  name_of_water: string;
  horste: string;
  kormoran: string;
}

export class RequestedForNextYear {
  fbz: string;
  wild_region: string;
  heron: string;
  kormoran: string;
}
