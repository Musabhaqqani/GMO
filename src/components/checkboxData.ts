// data.ts

export interface SubDepartment {
    name: string;
  }
  
  export interface Department {
    department: string;
    sub_departments: SubDepartment[];
  }
  
  export const data: Department[] = [
    {
      department: "customer_service",
      sub_departments: [
        { name: "support" },
        { name: "customer_success" }
      ]
    },
    {
      department: "Design",
      sub_departments: [
        { name: "graphic_design" },
        { name: "product_design" },
        { name: "web_design" }
      ]
    }
  ];
  