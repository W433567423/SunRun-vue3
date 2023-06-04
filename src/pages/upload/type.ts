import {PickerOption} from "vant";

interface IUploadForm {
    authorName: string
    nickName: string
    IMEI: string
    runTime: string
    stepCount: number
    runSpeed: number
}

interface IPickerOption {
    label: string
    defaultPicker: string | number
    name: string
}

interface IEmitElement {
    runTime?: string
    speedTime?: number
    stepCount?: number
}

interface IPickerProps {
    columns: PickerOption[]
    option: IPickerOption
}

interface IColumnObj {
    runTime: PickerOption[]
    stepCount: PickerOption[]
    speedTime: PickerOption[]
}

export type {IUploadForm, IPickerProps, IColumnObj, IEmitElement}