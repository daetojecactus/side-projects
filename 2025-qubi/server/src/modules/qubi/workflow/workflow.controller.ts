// import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
// import { JwtPublicAuthGuard } from '../auth-public/jwt-public-auth.guard';
// import { WorkflowService } from './workflow.service';
// import { WorkflowRequestDto } from './dto/workflow-request.dto';

// @Controller('v1')
// export class WorkflowController {
//   constructor(private readonly workflowService: WorkflowService) {}

//   @UseGuards(JwtPublicAuthGuard)
//   @Post('request')
//   async executeWorkflow(@Body() input: WorkflowRequestDto, @Req() req) {
//     return this.workflowService.execute(input, req.user.id);
//   }
// }

import { Body, Controller, Post } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowRequestDto } from './dto/workflow-request.dto';

@Controller('v1')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post('request')
  async executeWorkflow(@Body() input: WorkflowRequestDto) {
    return this.workflowService.execute(input);
  }
}
