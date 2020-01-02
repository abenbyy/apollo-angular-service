import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query } from '../models/query';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) {
    
   }

  searchUserByEmailorPhone(arg: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query GetUserByPhoneOrEmail($arg: String){
          userbyphoneoremail(arg:$arg){
            firstname,
            lastname,
            password,
            email,
            phone
          }
        }`,
        variables:{
          "arg": arg,
        }
    })
  }

  createUser(newUser: User):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateUser($firstname: String,$lastname: String, $password: String, $email: String, $phone: String,){
          createuser(firstname: $firstname, lastname: $lastname, password: $password, email: $email, phone: $phone){
            firstname,
            lastname,
            password,
            email,
            phone,
          }
        }`,
        variables:{
          "firstname":newUser.firstname,
          "lastname":newUser.lastname,
          "password":newUser.password,
          "email":newUser.email,
          "phone":newUser.phone,
        }
    })
  }


}
