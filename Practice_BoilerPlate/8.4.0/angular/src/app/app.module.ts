import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { StudentComponent } from './student/student.component';
import { CreateStudentDialogComponent } from './student/create-student/create-student-dialog.component';
import { EditStudentDialogComponent } from './student/edit-student/edit-student-dialog.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateDepartmentDialogComponent } from './department/create-department/create-department-dialog.component';
import { EditDepartmentDialogComponent } from './department/edit-department/edit-department-dialog.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { EditEmployeeDialogComponent } from './employee/edit-employee/edit-employee-dialog.component';
import { CreateEmployeeDialogComponent } from './employee/create-employee/create-employee-dialog.component';
import { CourseComponent } from './course/course.component';
import { CreateCourseDialogComponent } from './course/create-course/create-course-dialog.component';
import { EditCourseDialogComponent } from './course/edit-course/edit-course-dialog.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,
        StudentComponent,
        CreateStudentDialogComponent,
        EditStudentDialogComponent,
        DepartmentComponent,
        CreateDepartmentDialogComponent,
        EditDepartmentDialogComponent,
        EmployeeComponent,
        EditEmployeeDialogComponent,
        CreateEmployeeDialogComponent,
        CourseComponent,
        CreateCourseDialogComponent,
        EditCourseDialogComponent,
    
      
      
     
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
    ],
    providers: [
        DepartmentServiceProxy,
        EmployeeServiceProxy,
    ]
})
export class AppModule {}
