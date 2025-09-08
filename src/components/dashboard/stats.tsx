// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Users, Target, TrendingUp, Mail } from "lucide-react";



// export function DashboardStats() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {stats.map((stat) => (
//         <Card key={stat.title}>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               {stat.title}
//             </CardTitle>
//             <stat.icon className={`w-4 h-4 ${stat.color}`} />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stat.value}</div>
//             <p className="text-xs text-muted-foreground">
//               <span className="text-green-600">{stat.change}</span> from last month
//             </p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
