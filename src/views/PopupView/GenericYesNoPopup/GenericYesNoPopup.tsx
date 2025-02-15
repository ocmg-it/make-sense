import React, {useEffect, useState} from 'react'
import './GenericYesNoPopup.scss'
import {TextButton} from "../../Common/TextButton/TextButton";
import {ContextManager} from "../../../logic/context/ContextManager";
import {ContextType} from "../../../data/enums/ContextType";

interface IProps {
    title: string;
    renderContent: () => any;
    acceptLabel?: string;
    onAccept?: () => any;
    skipAcceptButton?: boolean;
    disableAcceptButton?: boolean;
    rejectLabel?: string;
    onReject?: () => any;
    skipRejectButton?: boolean;
    disableRejectButton?: boolean;
}

export const GenericYesNoPopup: React.FC<IProps> = (
    {
        title,
        renderContent,
        acceptLabel,
        onAccept,
        skipAcceptButton,
        disableAcceptButton,
        rejectLabel,
        onReject,
        skipRejectButton,
        disableRejectButton
    }) => {
    
    const [status, setMountStatus] = useState(false);
    useEffect(() => {
        if (!status) {
            ContextManager.switchCtx(ContextType.POPUP);
            setMountStatus(true);
        }
    }, [status]);

    return (
        <div className="GenericYesNoPopup loginShowniq__content">
            <div className="Header">
                {title}
            </div>
            <div className="Content">
                {renderContent()}
            </div>
            <div className="Footer">
                {!skipAcceptButton && <TextButton
                    label={!!acceptLabel ? acceptLabel : "YES"}
                    onClick={onAccept}
                    externalClassName={"accept me-2"}
                    isDisabled={disableAcceptButton}
                />}
                {!skipRejectButton && <TextButton
                    label={!!rejectLabel ? rejectLabel : "NO, THANKS"}
                    onClick={onReject}
                    externalClassName={"reject ms-2"}
                    isDisabled={disableRejectButton}
                />}
            </div>
        </div>
    )
};