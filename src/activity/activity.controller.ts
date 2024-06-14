import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AssignActivityDto, CreateActivityDto } from './dto/activity.dto';
import { UserService } from 'src/user/user.service';
import { checkActivityCreationPermission, checkAssignActivityPermission } from 'src/helpers/UserRole';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('activities')
@ApiBearerAuth()
@Controller('activity')
export class ActivityController {

    constructor(private activityService: ActivityService, private userService: UserService) { }

    @UseGuards(JwtGuard)
    @Post('create')
    async create(@Body() dto: CreateActivityDto, @Req() req: Request) {
        checkActivityCreationPermission(this.userService, req['user'].email);
        return await this.activityService.create(dto);
    }

    @UseGuards(JwtGuard)
    @Post('assign')
    async assignActivity(@Body() dto: AssignActivityDto, @Req() req: Request) {
        checkAssignActivityPermission(this.userService, req['user'].email);
        return await this.activityService.assignActivity(dto);
    }

    @UseGuards(JwtGuard)
    @Get()
    async getAll(@Req() req: Request) {
        return await this.activityService.getAll();
    }

}
