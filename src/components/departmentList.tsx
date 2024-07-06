// DepartmentList.tsx

import React, { useState } from 'react';
import { Checkbox, Collapse, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Department, SubDepartment } from './checkboxData';

interface DepartmentListProps {
  departments: Department[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments }) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);

  const handleExpand = (department: string) => {
    setExpanded(expanded.includes(department) ? expanded.filter(item => item !== department) : [...expanded, department]);
  };

  const handleDepartmentSelect = (department: string, subDepartments: SubDepartment[]) => {
    if (selectedDepartments.includes(department)) {
      setSelectedDepartments(selectedDepartments.filter(item => item !== department));
      setSelectedSubDepartments(selectedSubDepartments.filter(sub => !subDepartments.some(s => s.name === sub)));
    } else {
      setSelectedDepartments([...selectedDepartments, department]);
      setSelectedSubDepartments([...selectedSubDepartments, ...subDepartments.map(s => s.name)]);
    }
  };

  const handleSubDepartmentSelect = (subDepartment: string, department: string, subDepartments: SubDepartment[]) => {
    if (selectedSubDepartments.includes(subDepartment)) {
      setSelectedSubDepartments(selectedSubDepartments.filter(item => item !== subDepartment));
      // Remove the department if any sub-department is deselected
      setSelectedDepartments(selectedDepartments.filter(item => item !== department));
    } else {
      setSelectedSubDepartments([...selectedSubDepartments, subDepartment]);
      const departmentSubDepartments = subDepartments.map(s => s.name);
      const allSelected = departmentSubDepartments.every(sub => [...selectedSubDepartments, subDepartment].includes(sub));
      if (allSelected) {
        setSelectedDepartments([...selectedDepartments, department]);
      }
    }
  };

  return (
    <List>
      {departments.map((dept) => (
        <div key={dept.department}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedDepartments.includes(dept.department)}
                tabIndex={-1}
                disableRipple
                onClick={() => handleDepartmentSelect(dept.department, dept.sub_departments)}
              />
            </ListItemIcon>
            <ListItemText primary={dept.department} />
            <IconButton onClick={() => handleExpand(dept.department)}>
              {expanded.includes(dept.department) ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={expanded.includes(dept.department)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.sub_departments.map((sub) => (
                <ListItem key={sub.name} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedSubDepartments.includes(sub.name)}
                      tabIndex={-1}
                      disableRipple
                      onClick={() => handleSubDepartmentSelect(sub.name, dept.department, dept.sub_departments)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
