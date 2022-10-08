import { Injectable } from '@angular/core';
import { Member } from '../interfaces/member';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  private membersUrl = 'http://localhost:3000/members';

  constructor(private http: HttpClient) { }

  getMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url)
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl);
  }

  updateMember(member: Member): Observable<any> {
    const url = `${this.membersUrl}/${member.id}`;
    return this.http.put<Member>(url, member, this.httpOptions);
    // return this.http.put(url, member, this.httpOptions);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl, member, this.httpOptions)
  }

  deleteMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;

    return this.http.delete<Member>(url, this.httpOptions)
  }
}
