import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/interfaces/member';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  @Input() member?: Member;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.memberService.getMember(id).subscribe(member => this.member = member)
  }

  goBack() {
    this.location.back();
  }

  save(): void {
    if(this.member) {
      console.log(this.member);
      this.memberService.updateMember(this.member).subscribe(() => this.goBack());
    }
  }

}
