import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';


import { LayoutComponent } from "./website/components/layout/layout.component"

import { CustomPreloadService } from "./services/custom-preload.service"

import { QuicklinkStrategy } from "ngx-quicklink"


import { AdminGuard } from "./guards/admin.guard"

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./website/website.module").then((m: any) =>
      m.WebsiteModule
    ),
    data: {
      preload: true
    }
  },
  {
    path: "cms",
    canActivate: [AdminGuard],
    loadChildren: () => import("./cms/cms.module").then((m: any) => 
      m.CmsModule
    ),
    data: {
      preload: true
    }
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
