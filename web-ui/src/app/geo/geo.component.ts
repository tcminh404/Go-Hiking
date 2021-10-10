import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeoService } from 'src/services/geo.service';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.scss']
})
export class GeoComponent implements OnInit {
  locationForm: FormGroup
  hide = true

  loading = false
  submitted = false
  errorMsg: String
  returnUrl: String
  result: any

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: GeoService,
  ) { }

  ngOnInit(): void {
    this.locationForm = this.formBuilder.group({
      lat: ['', Validators.compose([Validators.required])],
      lng: ['', Validators.compose([Validators.required])],
      offset: [''],
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.locationForm.invalid) {
      return
    }
    this.startLoading()
    this.errorMsg = null
    this.service.decode(this.f.lat.value, this.f.lng.value, this.f.offset.value).subscribe(
      (info) => {
        this.result = info
      },
      (error) => {
        if (error.status === 400) {
          this.errorMsg = 'Username or Password is incorrect'
        } else {
          this.errorMsg = error.msg || error.error.error || "UNKNOWN_ERROR"
        }
        this.stopLoading()
      },
      () => {
        setTimeout(() => {
          this.stopLoading()
        }, 500)
      }
    )
  }

  get f() {
    return this.locationForm.controls
  }
  private startLoading() {
    this.loading = true
  }
  /** stop form loading status */
  private stopLoading() {
    this.loading = false
  }

}
