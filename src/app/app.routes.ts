 
import { ConfigComponent } from './config/config.component'
import { DashboardComponent } from './dashboard/dashboard.component';
 
const routes = [
  {
    path: 'file/:id',
    component: DashboardComponent
  },
   {
     path: '',
     component: DashboardComponent
   }

];

export const appRouterProviders = routes;
