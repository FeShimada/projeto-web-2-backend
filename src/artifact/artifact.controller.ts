import { ArtifactService } from './artifact.service';
import { Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateArtifactDto } from './dto/artifact.dto';
import { checkArtifactCreationPermission } from 'src/helpers/UserRole';
import { UserService } from 'src/user/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('artifacts')
@ApiBearerAuth()
@Controller('artifact')
export class ArtifactController {

    constructor(private artifactService: ArtifactService, private userService: UserService) { }

    @UseGuards(JwtGuard)
    @Post('create')
    async create(@Body() dto: CreateArtifactDto, @Req() req: Request) {
        checkArtifactCreationPermission(this.userService, req['user'].email);
        return await this.artifactService.create(dto);
    }
}
