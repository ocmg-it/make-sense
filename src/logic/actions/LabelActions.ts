import {LabelsSelector} from '../../store/selectors/LabelsSelector';
import {
    HumanInfo,
    ImageData,
    ItemInfo,
    LabelLine,
    LabelName,
    LabelPoint,
    LabelPolygon,
    LabelRect
} from '../../store/labels/types';
import {filter} from 'lodash';
import {store} from '../../index';
import {
    updateActiveLabelMode,
    updateImageData,
    updateImageDataById
} from '../../store/labels/actionCreators';
import {LabelType, LabelModeType} from '../../data/enums/LabelType';
import {JSONUploadStatus} from '../../data/enums/JSONUploadStatus';

export class LabelActions {
    public static deleteActiveLabel() {
        const activeImageData: ImageData = LabelsSelector.getActiveImageData();
        const activeLabelId: string = LabelsSelector.getActiveLabelId();
        LabelActions.deleteImageLabelById(activeImageData.id, activeLabelId);
    }

    public static deleteImageLabelById(imageId: string, labelId: string) {
        switch (LabelsSelector.getActiveLabelType()) {
            case LabelType.POINT:
                LabelActions.deletePointLabelById(imageId, labelId);
                break;
            case LabelType.RECT:
                LabelActions.deleteRectLabelById(imageId, labelId);
                break;
            case LabelType.POLYGON:
                LabelActions.deletePolygonLabelById(imageId, labelId);
                break;
        }
    }

    public static deleteRectLabelById(imageId: string, labelRectId: string) {
        // console.log('labelRectId: ', labelRectId);
        const imageData: ImageData = LabelsSelector.getImageDataById(imageId);
        const newImageData: ImageData = {
            ...imageData,
            labelRects: filter(
                imageData.labelRects,
                (currentLabel: LabelRect) => {
                    return currentLabel.id !== labelRectId;
                }
            ),
            humans: filter(
                imageData.humans,
                (human: HumanInfo) => human.uuid !== labelRectId
            ),
            items: filter(
                imageData.items,
                (item: ItemInfo) => item.uuid !== labelRectId
            ),
            uploadStatus: JSONUploadStatus.NEED_UPLOAD
        };
        store.dispatch(updateImageDataById(imageData.id, newImageData));
    }

    public static deletePointLabelById(imageId: string, labelPointId: string) {
        const imageData: ImageData = LabelsSelector.getImageDataById(imageId);
        const newImageData = {
            ...imageData,
            labelPoints: filter(
                imageData.labelPoints,
                (currentLabel: LabelPoint) => {
                    return currentLabel.id !== labelPointId;
                }
            )
        };
        store.dispatch(updateImageDataById(imageData.id, newImageData));
    }

    public static deleteLineLabelById(imageId: string, labelLineId: string) {
        const imageData: ImageData = LabelsSelector.getImageDataById(imageId);
        const newImageData = {
            ...imageData,
            labelLines: filter(
                imageData.labelLines,
                (currentLabel: LabelLine) => {
                    return currentLabel.id !== labelLineId;
                }
            )
        };
        store.dispatch(updateImageDataById(imageData.id, newImageData));
    }

    public static deletePolygonLabelById(
        imageId: string,
        labelPolygonId: string
    ) {
        const imageData: ImageData = LabelsSelector.getImageDataById(imageId);
        const newImageData = {
            ...imageData,
            labelPolygons: filter(
                imageData.labelPolygons,
                (currentLabel: LabelPolygon) => {
                    return currentLabel.id !== labelPolygonId;
                }
            )
        };
        store.dispatch(updateImageDataById(imageData.id, newImageData));
    }

    public static removeLabelNames(labelNamesIds: string[]) {
        const imagesData: ImageData[] = LabelsSelector.getImagesData();
        const newImagesData: ImageData[] = imagesData.map(
            (imageData: ImageData) => {
                return LabelActions.removeLabelNamesFromImageData(
                    imageData,
                    labelNamesIds
                );
            }
        );
        store.dispatch(updateImageData(newImagesData));
    }

    private static removeLabelNamesFromImageData(
        imageData: ImageData,
        labelNamesIds: string[]
    ): ImageData {
        return {
            ...imageData,
            labelRects: imageData.labelRects.map((labelRect: LabelRect) => {
                if (labelNamesIds.includes(labelRect.id)) {
                    return {
                        ...labelRect,
                        id: null
                    };
                } else {
                    return labelRect;
                }
            }),
            labelPoints: imageData.labelPoints.map((labelPoint: LabelPoint) => {
                if (labelNamesIds.includes(labelPoint.id)) {
                    return {
                        ...labelPoint,
                        id: null
                    };
                } else {
                    return labelPoint;
                }
            }),
            labelPolygons: imageData.labelPolygons.map(
                (labelPolygon: LabelPolygon) => {
                    if (labelNamesIds.includes(labelPolygon.id)) {
                        return {
                            ...labelPolygon,
                            id: null
                        };
                    } else {
                        return labelPolygon;
                    }
                }
            ),
            labelNameIds: imageData.labelNameIds.filter(
                (labelNameId: string) => {
                    return !labelNamesIds.includes(labelNameId);
                }
            )
        };
    }

    public static labelExistsInLabelNames(label: string): boolean {
        const labelNames: LabelName[] = LabelsSelector.getLabelNames();
        return labelNames
            .map((labelName: LabelName) => labelName.name)
            .includes(label);
    }

    public static selectLabelMode(mode: LabelModeType) {
        store.dispatch(updateActiveLabelMode(mode));
    }
}
