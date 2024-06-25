import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-gyms-home-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './gyms-home-page.component.html',
  styleUrl: './gyms-home-page.component.scss'
})
export class GymsHomePageComponent {
  public readonly list = signal<{ name: string, avatar: string, city: string, googleMaps: string | null, whatsApp: string }[]>([
    { 
      name: 'Kanuth Box',
      city: 'San José del Guavare',
      whatsApp: '+573209716145',
      googleMaps: 'https://maps.app.goo.gl/VYpyvuA7KK3e3p4X6',
      avatar: 'https://scontent.fbog16-1.fna.fbcdn.net/v/t39.30808-1/308586933_204586025292567_1788156226192234888_n.png?stp=dst-png_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=ElpLTFuquUoQ7kNvgFbzLRN&_nc_ht=scontent.fbog16-1.fna&oh=00_AYAuUX533ef6gXCt2AqA4n9xQv-nsiCkgif13iDON75B4w&oe=6680B270'
    },
    { 
      name: 'Smart Alpha Gym',
      city: 'San José del Guavare',
      whatsApp: '+573209716145',
      googleMaps: null,
      avatar: 'https://scontent.fbog16-1.fna.fbcdn.net/v/t39.30808-1/308586933_204586025292567_1788156226192234888_n.png?stp=dst-png_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=ElpLTFuquUoQ7kNvgFbzLRN&_nc_ht=scontent.fbog16-1.fna&oh=00_AYAuUX533ef6gXCt2AqA4n9xQv-nsiCkgif13iDON75B4w&oe=6680B270'
    },
    { 
      name: 'GYM 24/7 FIT',
      city: 'San José del Guavare',
      whatsApp: '+573209716145',
      googleMaps: null,
      avatar: 'https://scontent.fbog16-1.fna.fbcdn.net/v/t39.30808-1/308586933_204586025292567_1788156226192234888_n.png?stp=dst-png_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=ElpLTFuquUoQ7kNvgFbzLRN&_nc_ht=scontent.fbog16-1.fna&oh=00_AYAuUX533ef6gXCt2AqA4n9xQv-nsiCkgif13iDON75B4w&oe=6680B270'
    },
    {
      name: 'Power GYMax',
      city: 'San José del Guavare',
      whatsApp: '+573209716145',
      googleMaps: null,
      avatar: 'https://scontent.fbog16-1.fna.fbcdn.net/v/t39.30808-1/414981257_791834716291806_4458563731422457965_n.jpg?stp=c2.0.200.200a_dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=MFMb83DtdK0Q7kNvgEObmv-&_nc_ht=scontent.fbog16-1.fna&oh=00_AYC33wulWPuwxPTkfGLwfl_1eLV-fHJh0WikwTnpPzABnw&oe=66809CCB'
    },
  ]);
}
