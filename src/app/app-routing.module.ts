import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WildcardComponent } from './pages/wildcard/wildcard.component';
import { ErrorComponent } from './pages/error/error.component';
import { FullLayoutComponent } from './pages/full-layout/full-layout.component';
import { Authguard } from './providers/authguard';

const routes: Routes =
  [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'login',
      loadChildren: () =>
        import('./pages/login/login.module').then((m) => m.LoginModule),
    }, {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'dashboard',
      canActivate: [Authguard],
      loadChildren: () =>
        import('./pages/maindashboard/maindashboard.module').then((m) => m.MaindashboardModule),
    },
    {
      path: '', component: FullLayoutComponent,
      canActivate: [Authguard],
      children: [{
        path: 'chat',
        // canActivate: [Authguard],
        loadChildren: () => import('./pages/chats/mainchat.module').then(m => m.MainchatModule),
      },
      {
        path: 'encaps',
        // canActivate: [Authguard],
        loadChildren: () => import('./pages/encaps/encaps.module').then(m => m.EncapsModule),
      },
      {
        path: 'journey',
        // canActivate: [Authguard],
        loadChildren: () => import('./pages/journey/journey.module').then(m => m.JourneyModule),
      }
      ]
    },
    {
      path: 'integration/encaps',
      loadChildren: () => import('./pages/encaps/encaps.module').then(m => m.EncapsModule),
    },
    {
      path: 'integration/journey',
      loadChildren: () => import('./pages/journey/journey.module').then(m => m.JourneyModule),
    },
    {
      path: 'integration/chat',
      loadChildren: () => import('./pages/chats/mainchat.module').then(m => m.MainchatModule),
    },
    {
      path: 'error',
      component: ErrorComponent
    },
    {
      path: '**',
      component: WildcardComponent
    }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

