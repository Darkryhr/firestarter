import { CustomerDataService } from './../../services/customer-data.service';
import { SeoService } from './../../services/seo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  customerId: string;
  customer: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private db: AngularFirestore,
    public data: CustomerDataService
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.customer = this.data.getCustomer(this.customerId).pipe(
      tap((cust) =>
        this.seo.generateTags({
          title: cust.title,
          description: cust.description,
          img: cust.img,
        })
      )
    );
  }
}
