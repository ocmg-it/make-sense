import {LabelType} from './enums/LabelType';
import {ILabelFormatData} from '../interfaces/ILabelFormatData';
import {AnnotationFormatType} from './enums/AnnotationFormatType';

export type ImportFormatDataMap = Record<LabelType, ILabelFormatData[]>;

export const ImportFormatData: ImportFormatDataMap = {
    [LabelType.RECT]: [
        {
            type: AnnotationFormatType.MJ,
            label: 'Multiple files in MJ JSON format.'
        },
        {
            type: AnnotationFormatType.COCO,
            label: 'Single file in COCO JSON format.'
        },
        {
            type: AnnotationFormatType.YOLO,
            label: 'Multiple files in YOLO format along with labels names definition - labels.txt file.'
        }
    ],
    [LabelType.POINT]: [],
    [LabelType.LINE]: [],
    [LabelType.POLYGON]: [
        {
            type: AnnotationFormatType.COCO,
            label: 'Single file in COCO JSON format.'
        }
    ],
    [LabelType.IMAGE_RECOGNITION]: []
};
