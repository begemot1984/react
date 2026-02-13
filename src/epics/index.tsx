import {
  loadServicesFail,
  loadServicesRequest,
  loadServicesSuccess,
  type Service,
} from "../features/main/mainSlice";
import {
  loadDetailsFail,
  loadDetailsRequest,
  loadDetailsSuccess,
  type Details,
} from "../features/details/detailsSlice";
import { SERVICES_URL } from "../constants";
import type { PayloadAction } from "@reduxjs/toolkit";
import { catchError, from, map, mergeMap, of, switchMap } from "rxjs";
import { ofType } from "redux-observable";

export const loadServicesEpic = (action$) =>
  action$.pipe(
    ofType(loadServicesRequest().type),
    switchMap(() =>
      from(fetch(SERVICES_URL)).pipe(
        catchError((e) => of(loadServicesFail(e.message))),
      ),
    ),
    switchMap((response: Response) => {
      if (response.ok) {
        return from(response.json()).pipe(
          map((services: Service[]) => loadServicesSuccess(services)),
          catchError((e) => of(loadServicesFail(e.message))),
        );
      } else {
        return from(
          response.text().then((errMsg) => `Код ${response.status}: ${errMsg}`),
        ).pipe(map((errMsg) => loadServicesFail(errMsg)));
      }
    }),
  );

export const loadDetailsEpic = (action$) =>
  action$.pipe(
    ofType(loadDetailsRequest("").type),
    switchMap((action: PayloadAction<string>) =>
      from(fetch(`${SERVICES_URL}/${action.payload}`)).pipe(
        catchError((e) => of(loadDetailsFail(e.message))),
      ),
    ),
    switchMap((response: Response) => {
      if (response.ok) {
        return from(response.json()).pipe(
          map((details: Details) => loadDetailsSuccess(details)),
          catchError((e) => of(loadDetailsFail(e.message))),
        );
      } else if (response.status === 404) {
        return of(loadDetailsFail("Услуга не найдена"));
      } else {
        return from(
          response.text().then((errMsg) => `Код ${response.status}: ${errMsg}`),
        ).pipe(map((errMsg) => loadDetailsFail(errMsg)));
      }
    }),
  );
