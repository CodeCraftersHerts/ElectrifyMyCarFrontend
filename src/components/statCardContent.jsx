import React from 'react';
import { Info, Zap, Activity } from 'lucide-react';
import { LuBattery, LuBatteryFull, LuFastForward, LuTrendingDown } from "react-icons/lu";

export const statCardContent = [
  {
    text: "Did you know that EVs reduce CO2 emissions by up to 50%?",
    icon: <LuTrendingDown size={96} />
  },
  {
    text: "Did you know that charging an EV is often cheaper than fueling a gas car?",
    icon: <LuBatteryFull size={96} />
  },
  {
    text: "Did you know that EVs offer smoother acceleration than traditional vehicles?",
    icon: <LuFastForward size={96} />
  },
  {
    text: "Did you know that battery technology in EVs has advanced rapidly in recent years?",
    icon: <Activity size={96} />
  }
];
