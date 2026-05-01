import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './generics/role.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
      constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        private jwtSer : JwtService
      ) {}

    async signUp(informations) {
        let newUserEntity = this.userRepo.create({
            email: informations.email,
            username: informations.username,
            role: informations.role || Roles.ROLE_USER,
            salt: await bcrypt.genSalt()
        });

        newUserEntity.password = await bcrypt.hash(informations.password, newUserEntity.salt);
         
        try {
            let data = await this.userRepo.save(newUserEntity);
            return data;
        } catch {
            throw new ConflictException();
        }
    }
    
    async signIn(informations) {
        const { identifiant, password } = informations;

        const user = await this.userRepo
            .createQueryBuilder('user')
            .where('user.username = :ident', { ident: identifiant })
            .orWhere('user.email = :ident', { ident: identifiant })
            .getOne();

        if (!user) throw new NotFoundException("Identifiant inexistant");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new NotFoundException("Mot de passe erroné");

        const token = this.jwtSer.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            access_token: token,
        };
    }

    async getAllUsers() {
        return await this.userRepo.find({
            select: ['id', 'email', 'username', 'role']
        });
    }

    async deleteUser(id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        await this.userRepo.delete(id);
        return { message: 'User deleted successfully' };
    }
}