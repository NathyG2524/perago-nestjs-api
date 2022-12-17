import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

describe('UserController', () => {
    let controller: UserController;
    const mockUserService = {
        id: "123",
        create: jest.fn(dto => {
            return {
                id: Date.now(),
                ...dto
            }
        }),
        update: jest.fn(dto => {
            return {
                id: Date.now(),
                ...dto
            }
        }),
        findAll: jest.fn(() => { }),
        findOne: jest.fn(() => { }),
        findChildren: jest.fn(() => { }),
        remove: jest.fn(() => { })
    }


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideProvider(UserService).useValue(mockUserService).compile();

        controller = module.get<UserController>(UserController);
    });

    const dto = {
        "id": "9511b319-da4d-4a0d-b0d8-6f723be047b8",
        "name": "CEO",
        "description": "managing a company's overall operations"
    }

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it("calling create method", () => {
        const dto = new CreateUserDto()
        expect(mockUserService.create(dto)).not.toEqual(null);
    })

    it("should call findChildren method", () => {
        controller.findChildren(dto.id)
        expect(mockUserService.findChildren).toHaveBeenCalled()
    })

    it('should create a user', () => {
        expect(controller.create(dto)).toEqual({
            id: expect.any(String),
            name: dto.name,
            description: dto.description
        })
    });

    it("calls the findAll method", () => {
        controller.findAll();
        expect(mockUserService.findAll).toHaveBeenCalled();
    });

    it("calls findId method", () => {
        controller.findOne(dto.id)
        expect(mockUserService.findOne).toHaveBeenCalled();
    })

    it('should update a user', () => {
        controller.update(dto.id, dto)
        expect(mockUserService.findOne).toHaveBeenCalled();
    });

    it("should call remove", () => {
        controller.remove(dto.id)
        expect(mockUserService.remove).toHaveBeenCalled();
    })
});
