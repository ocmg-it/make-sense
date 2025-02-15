import {Action} from '../Actions';

export type AIState = {
    // SSD
    isObjectDetectorLoaded: boolean;

    // POSE NET
    isPoseDetectorLoaded: boolean;

    // GENERAL
    suggestedLabelList: string[];
    rejectedSuggestedLabelList: string[];
    isAIDisabled: boolean;

    // SHOWNIQ Vision AI Criteria
    scoreCriteria: {
        gender: number,
        style: number,
        color: number,
        pattern: number,
        item: number
    }
}

interface UpdateSuggestedLabelList {
    type: typeof Action.UPDATE_SUGGESTED_LABEL_LIST;
    payload: {
        labelList: string[];
    }
}

interface UpdateRejectedSuggestedLabelList {
    type: typeof Action.UPDATE_REJECTED_SUGGESTED_LABEL_LIST;
    payload: {
        labelList: string[];
    }
}

interface UpdateObjectDetectorStatus {
    type: typeof Action.UPDATE_OBJECT_DETECTOR_STATUS;
    payload: {
        isObjectDetectorLoaded: boolean;
    }
}

interface UpdatePoseDetectorStatus {
    type: typeof Action.UPDATE_POSE_DETECTOR_STATUS;
    payload: {
        isPoseDetectorLoaded: boolean;
    }
}

interface UpdateDisabledAIFlag {
    type: typeof Action.UPDATE_DISABLED_AI_FLAG;
    payload: {
        isAIDisabled: boolean;
    }
}

interface UpdateScoreCriteria {
    type: typeof Action.UPDATE_SCORE_CRITERIA;
    payload: {
        scoreCriteria: {
            gender: number,
            style: number,
            color: number,
            pattern: number,
            item: number    
        }
    }
}

export type AIActionTypes = UpdateSuggestedLabelList
    | UpdateRejectedSuggestedLabelList
    | UpdateObjectDetectorStatus
    | UpdatePoseDetectorStatus
    | UpdateDisabledAIFlag
    | UpdateScoreCriteria
