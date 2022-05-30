import * as interfaces from './interfaces';

export const roundOff = (num: number,precision:number): number => {
   return Math.round(num * (10 **  precision)) / (10 ** precision);
}

const calcTextProgress = (params: interfaces.Text): number => {
    return params.is_read ? 100 : 0;
}

const calcImageProgress = (params: interfaces.Image): number => {
    return params.is_viewed ? 100 : 0;
}

const calcVideoProgress = (params: interfaces.Video): number => {
    const ans = (params.watched_len / params.total_len) * 100;
    return roundOff(ans,2);
}

const calcPDFProgress = (params: interfaces.PDF): number => {
    const ans = (params.read_pages / params.total_pages) * 100;
    return roundOff(ans,2);
}

const compProgMap = new Map<string, (params: any) => number>();
compProgMap.set('Text', calcTextProgress);
compProgMap.set('Image', calcImageProgress);
compProgMap.set('Video', calcVideoProgress);
compProgMap.set('PDF', calcPDFProgress);

export { compProgMap };