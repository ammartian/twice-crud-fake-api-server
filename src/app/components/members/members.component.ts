import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/interfaces/member';
import { MemberService } from 'src/app/services/member.service';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  selectedMember?: Member;

  constructor( private memberService: MemberService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService.getMembers().subscribe(members => this.members = members);
  }

  add(name: string) {
    name = name.trim();
    if(!name) { return; }
    this.memberService.addMember({ name } as Member).subscribe( member => this.members.push(member))
  }

  delete(member: Member) {
    this.members = this.members.filter(m => m !== member);
    this.memberService.deleteMember(member.id).subscribe();
  }

}
