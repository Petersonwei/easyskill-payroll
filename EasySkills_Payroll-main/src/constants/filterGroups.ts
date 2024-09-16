export enum FilterGroupId {
  Dynamic = "perimeterDynamic",
  Agencies = "perimeterAgencies",
  Types = "resourceTypes",
}

export const PERIMETERS_GROUP = [
  {
    id: "perimeterDynamic",
    label: "Dynamic perimeters",
    columns: [
      {
        id: "agencies",
        label: "My agencies",
      },
      {
        id: "data",
        label: "My data",
      },
    ],
  },
  {
    id: "perimeterAgencies",
    label: "Agencies",
    columns: [
      {
        id: "5",
        label: "Easy Skill Australia",
      },
      {
        id: "2",
        label: "Easy Skill Australia Intl",
      },
      {
        id: "6",
        label: "Easy Skill de Mo\u00e7ambique",
      },
      {
        id: "1",
        label: "Easy Skill France",
      },
      {
        id: "8",
        label: "Easy Skill France INTL",
      },
      {
        id: "3",
        label: "Easy Skill NC",
      },
      {
        id: "10",
        label: "Easy Skill Papua LNG PGK",
      },
      {
        id: "11",
        label: "Easy SKill Papua LNG USD",
      },
      {
        id: "4",
        label: "Easy Skill PNG Limited",
      },
      {
        id: "9",
        label: "Easy Skill Singapore - Teamforge PTE LTD",
      },
      {
        id: "7",
        label: "Train & Mobilize - Easy Skill MDG",
      },
    ],
  },
];

export const DYNAMIC_GROUP = {
  id: FilterGroupId.Dynamic,
  label: "Dynamic perimeters",
  columns: [
    { id: "agencies", label: "My agencies" },
    { id: "data", label: "My data" },
  ],
};

export const AGENCIES_GROUP = {
  id: FilterGroupId.Agencies,
  label: "Agencies",
  columns: [
    { id: "5", label: "Easy Skill Australia" },
    { id: "2", label: "Easy Skill Australia Intl" },
    { id: "6", label: "Easy Skill de Mo\u00e7ambique" },
    { id: "1", label: "Easy Skill France" },
    { id: "8", label: "Easy Skill France INTL" },
    { id: "3", label: "Easy Skill NC" },
    { id: "10", label: "Easy Skill Papua LNG PGK" },
    { id: "11", label: "Easy SKill Papua LNG USD" },
    { id: "4", label: "Easy Skill PNG Limited" },
    { id: "9", label: "Easy Skill Singapore - Teamforge PTE LTD" },
    { id: "7", label: "Train & Mobilize - Easy Skill MDG" },
  ],
};
export const TYPE_GROUP = {
  id: FilterGroupId.Types,
  columns: [
    { id: "0", label: "Internal Consultant DO NOT USE" },
    { id: "1", label: "External Consultant DO NOT USE" },
    { id: "2", label: "Business Manager" },
    { id: "3", label: "BU Manager" },
    { id: "4", label: "BU Director" },
    { id: "5", label: "Recruitment Specialist" },
    { id: "6", label: "Recruitment Manager" },
    { id: "7", label: "Admin" },
    { id: "8", label: "Finance" },
    { id: "10", label: "Hors effectif" },
    { id: "11", label: "Intern" },
    { id: "12", label: "HR" },
    { id: "13", label: "Consultant Expat Monthly" },
    { id: "14", label: "Consultant Local Cont Monthly" },
    { id: "15", label: "Consultant Expat Daily" },
    { id: "16", label: "Consultant Local Cont Daily" },
    { id: "17", label: "Consultant Expat Monthly" },
    { id: "18", label: "Consultant Local Cont Monthly" },
    { id: "19", label: "Consultant Expat Daily" },
  ],
};
