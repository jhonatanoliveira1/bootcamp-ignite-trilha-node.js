import { inject, injectable } from 'tsyringe';

import ICreateSpecificationDTO from '@modules/cars/dtos/ICreateSpecificationDTO';
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specificationsAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationsAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export default CreateSpecificationUseCase;
