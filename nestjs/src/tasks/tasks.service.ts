import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { UpdateTaskDto } from './dto/update-task.dto';


@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) { }

  // Create a new task
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskModel.create({ ...createTaskDto })
  }

  async remove(id: string): Promise<{ deletedCount: number }> {
    const deleted = await this.taskModel.destroy({
      where: {
        id: id,
      },
      force: true
    });

    return {
      deletedCount: deleted
    }
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<{ updated: number }> {
    const [affectedCount] = await this.taskModel.update(
      { title: updateTaskDto.title, isCompleted: updateTaskDto.isCompleted },
      {
        where: {
          id
        },
      }
    )
    return {
      updated: affectedCount
    }
  }
}
