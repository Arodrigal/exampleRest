import { provideRouter, RouterConfig } from '@angular/router';

import { LoginComponent } from "./components/login.component";
import { RegisterComponent } from "./components/register.component";
import { DefaultComponent } from "./components/default.component";
import { UserEditComponent } from "./components/user.edit.component";
import { VideoNewComponent } from "./components/video.new.component";
import { VideoDetailsComponent } from "./components/video.details.component";
import { VideoEditComponent } from "./components/video.edit.component";

export const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/index',
    terminal: true
  },
  {path: 'index', component: DefaultComponent},
  {path: 'index/:page', component: DefaultComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/:id', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user-edit', component: UserEditComponent},
  {path: 'video-new', component: VideoNewComponent},
  {path: 'video/:id', component: VideoDetailsComponent},
  {path: 'video-edit/:id', component: VideoEditComponent},
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
