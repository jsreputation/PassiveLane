import { FormGroup } from '@angular/forms';

export class PhoneNumberValidator {
  static validPhoneNumber(prefix, phone_number) {
    return (group: FormGroup) => {
      const curPhonePrefix = group.value[prefix];
      const curPhonePhonePrefixControl = group.controls[prefix];
      const regexPrefix = new RegExp(`^([+]?[0-9]{1,2})$`);

      let curPhonePrefixCount;

      if (regexPrefix.test(curPhonePrefix)) {
        curPhonePrefixCount = String(curPhonePrefix).length - 1;
        const curPhoneNumber = group.value[phone_number];
        const curPhoneNumberControl = group.controls[phone_number];
        // const regex = new RegExp(`^[0-9]{${10 - curPhonePrefixCount}}$`);
        const regex = new RegExp(`^[0-9]{6,12}$`);

        if (regex.test(curPhoneNumber)) {
          return curPhoneNumberControl.setErrors(null);
        } else if (curPhoneNumber === null || String(curPhoneNumber).length < 1) {
          return curPhoneNumberControl.setErrors({ required: true});
        } else {
          return curPhoneNumberControl.setErrors({ invalidPhoneNumber: true});
        }
      } else if (curPhonePrefix === null || String(curPhonePrefix).length < 1) {
        return curPhonePhonePrefixControl.setErrors({ required: true });
      } else {
        return curPhonePhonePrefixControl.setErrors({ invalidPhonePrefix: true});
      }
    };
  }
}
