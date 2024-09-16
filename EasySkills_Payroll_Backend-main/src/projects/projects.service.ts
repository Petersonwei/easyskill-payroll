import { Injectable } from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';
import { ApiResponse } from 'src/payrolls/types/types';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProjectsService {
  constructor(private httpService: HttpService) {}

  async findProjects(id: string) {
    const projectsResponse = await this.httpService
      .get<ApiResponse<ProjectDto[]>>(`/resources/${id}/projects`)
      .toPromise();

    return { projects: projectsResponse?.data.data ?? [], included: projectsResponse?.data.included };
  }
}
