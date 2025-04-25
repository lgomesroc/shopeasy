import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: User = { id: 0, name: '', email: '', role: 'customer' };
  isEditing = false;
  currentUserId = 0;

  // URL do backend para API de usuários
  private apiUrl = 'http://localhost:8001/api/users';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  saveUser(): void {
    if (this.isEditing) {
      this.http.put(`${this.apiUrl}/${this.currentUserId}`, this.newUser).subscribe(
        () => {
          this.resetForm();
          this.loadUsers();
        },
        (error) => {
          console.error('Erro ao atualizar usuário:', error);
        }
      );
    } else {
      this.http.post(this.apiUrl, this.newUser).subscribe(
        () => {
          this.resetForm();
          this.loadUsers();
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      );
    }
  }

  editUser(user: User): void {
    this.isEditing = true;
    this.currentUserId = user.id;
    this.newUser = { ...user };
  }

  deleteUser(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Erro ao excluir usuário:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentUserId = 0;
    this.newUser = { id: 0, name: '', email: '', role: 'customer' };
  }
}
