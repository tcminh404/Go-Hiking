import { FormGroup } from '@angular/forms'

export class Util {
    /**
     * Check whether object is null or undefined
     * @param obj object
     * @returns boolean
     */
    static isNull(obj) {
        return null == obj || undefined === obj
    }
    /**
     * Check whether tring is null or empty or undefined
     * @param str string
     * @returns boolean
     */
    static isEmptyString(str: string): boolean {
        return str === null || str === undefined || str === ''
    }
    /**
     * Check decimal (10.9)
     * @param num number
     */
    static roundToADecimalOne(num: number): boolean {
        const res = num.toString().split('.')
        if (res[1] && res[1] !== undefined && res[1].length > 1) {
            return true
        }
        return false
    }
    static roundToADecimalThree(num: number): boolean {
        const res = num.toString().split('.')
        if (res[1] && res[1] !== undefined && res[1].length > 3) {
            return true
        }
        return false
    }
    static trueFormatNumber(num: number): boolean {
        const res = num.toString().split('.')
        if (res[1] === '' || res[1] === null) {
            return true
        }
        return false
    }
    /**
     * Compare 2 value
     * @param a element a
     * @param b element b
     * @param isAsc order by ascending
     * @returns a positive numbers if a > b otherwise return negative numbers
     */
    static compare(a, b, isAsc): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
    }
    /**
     * Remove element in array
     * @param array
     * @param element
     * @returns true if success otherwise return false
     */
    static arrayRemoveElement<T>(array: Array<T>, element: T): boolean {
        const index = array.indexOf(element)
        if (index >= 0) {
            array.splice(index, 1)
            return true
        }
        return false
    }
    /**
     * array2 - array1
     * @param array1
     * @param array2
     */
    static arrayRemoveArray<T>(array1: Array<T>, array2: Array<T>) {
        for (let i = 0, l = array1.length; i < l; i++) {
            Util.arrayRemoveElement(array2, array1[i])
        }
    }

    /** Get last element of array */
    static arrayGetLastElement<T>(array: Array<T>) {
        const length = array.length
        if (length > 0) {
            return array[length - 1]
        } else {
            return null
        }
    }
    /**
     * Convert non-nested map to object
     * @param object
     * @param map
     * @returns converted object
     */
    static mapToObject(object, map) {
        for (const [key, value] of map) {
            object[key] = value
        }
        return object
    }

    /**
     * Rounded down value on base using Math.Floor
     * @param value
     * @param base
     */
    static roundDown(value: number, base: number) {
        return Math.floor(value / base) * base
    }

    /**
     * Rounded up value on base using Math.Floor
     * @param value
     * @param base
     */
    static roundUp(value: number, base: number) {
        const roundDown = this.roundDown(value, base)
        return value > roundDown ? roundDown + base : roundDown
    }

    /**
     * Rounded down value on base using Math.Round (auto up-down)
     * @param value
     * @param base
     */
    static round(value: number, base: number) {
        return Math.round(value * base) / base
    }
    /**
     *
     * @param obj
     */
    static trimAllObjectProperty(obj: object) {
        Object.keys(obj).map((k) => (obj[k] = typeof obj[k] === 'string' ? obj[k].trim() : obj[k]))
    }
    /**
     *
     * @param target
     * @param source
     */
    static updateObject(target: object, source: object) {
        Object.keys(target).map((k) => (target[k] = source[k]))
    }
    /**
     *
     * @param data
     * @param value
     */
    static contain(data: Array<string>, value: string): boolean {
        const length = data.length
        for (let i = 0; i < length; i++) {
            if (data[i].toLowerCase().includes(value)) {
                return true
            }
        }
        return false
    }
    /**
     * put data from array into map, T must include id
     * @param sources Array
     * @param target Map
     */
    static putToMap(sources: Array<any>, target: Map<string, any>, keyName: string = 'id') {
        for (let i = 0, l = sources.length; i < l; i++) {
            const item = sources[i]
            target.set(item[keyName], item)
        }
    }
    /**
     * Get Array items from source map by array keys
     * @param keys
     * @param sourceMap
     */
    static findByKeys<T>(keys: string[], sourceMap: Map<string, T>): Array<T> {
        const results: Array<T> = []
        for (let i = 0, l = keys.length; i < l; i++) {
            const item = sourceMap.get(keys[i])
            if (item) {
                results.push(item)
            }
        }
        return results
    }

    /** Deeply Clone Array
     * @useCase clone deep array object only
     * @param arrayPlantObject
     */
    static cloneArray<T>(arrayPlantObject: Array<T>) {
        return arrayPlantObject.map((item) => Object.assign({}, item))
    }

    /**
     * round 2 decimal places
     * @param number
     */
    static convertDecimalNumber(num: number) {
        return Math.round(num * 100) / 100
    }

    static validateForm(array: Array<string>, formControl: FormGroup) {
        array.forEach((element) => {
            const control = formControl.controls[element]
            let value = control.value
            if ('string' === typeof value) {
                value = value.trim()
                control.setValue(value)
                if (Util.isEmptyString(value)) {
                    control.setErrors({ required: true })
                }
            }
        })
    }

    static assignDefined(target, ...sources) {
        for (const source of sources) {
            for (const key of Object.keys(source)) {
                const val = source[key];
                if (val !== undefined && val !== null) {
                    target[key] = val;
                    if (typeof val === 'object') {
                        Util.assignDefined(target[key], val)
                    }
                }
            }
        }
        return target;
    }
}
