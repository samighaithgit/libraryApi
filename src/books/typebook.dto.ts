import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class BookTypePipe implements PipeTransform {
  transform(value: string) {
    const allowedTypes = ['math', 'history', 'arabic', 'english', 'science'];

    if (!allowedTypes.includes(value)) {
      throw new BadRequestException(
        `Invalid book type. Allowed types are: ${allowedTypes.join(', ')}`,
      );
    }

    return value;
  }
}