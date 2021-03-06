import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseData } from '@/common/interfaces/response.interface';
interface Response<ResponseData> {
  data: ResponseData;
}
@Injectable()
export class TransformInterceptor<ResponseData>
  implements NestInterceptor<ResponseData, Response<ResponseData>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ResponseData>,
  ): Observable<Response<ResponseData>> {
    return next.handle().pipe(
      map(response => {
        if (response['data'] === undefined) response['data'] = null;
        return {
          code: response['code'],
          message: response['message'],
          data: response['data'],
        };
      }),
    );
  }
}
