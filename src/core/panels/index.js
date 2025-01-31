/* eslint-disable @typescript-eslint/no-unused-vars */

import StudentRoutes from "@/core/panels/student/routes.jsx";
import studentResources from "@/core/panels/student/resources.jsx";

export const panels = {
  student: {
    resources: studentResources,
    routes: StudentRoutes,
  },
};

export default panels;
