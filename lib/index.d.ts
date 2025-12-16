import { Context, Schema } from 'koishi';
export declare const name = "60snews";
export interface Config {
    api_url: string;
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: Context, config: Config): void;
