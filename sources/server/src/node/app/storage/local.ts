/*
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

/// <reference path="../common/interfaces.d.ts" />
/// <reference path="../../../../../../externs/ts/node/node.d.ts" />
import fs = require('fs');
import pathlib = require('path');


/**
 * Manages storage operations backed by a local file system.
 */
export class LocalFileSystemStorage implements app.IStorage {

  _storageRootPath: string;

  /**
   * Constructor.
   *
   * @param storageRootPath The root path within the local filesystem to use for storage.
   */
  constructor(storageRootPath: string) {
    this._storageRootPath = storageRootPath;
  }

  /**
   * Asynchronously deletes the file at the given path.
   *
   * @param path The file system path to write to, relative to the root path.
   * @param callback Callback to invoke upon completion of the write operation.
   */
  delete(path: string, callback: app.Callback<void>) {
    fs.unlink(path, callback);
  }

  /**
   * Asynchronously enumerates the resources that match the given path prefix.
   *
   * @param path The path prefix for which to enumerate resources.
   * @param recursive Should the listing operation recursively enumerate sub-directories?
   * @param callback Completion callback to invoke.
   */
  list(path: string, recursive: boolean, callback: app.Callback<app.Resource[]>) {
    fs.readdir(path, (error, paths) => {

      // FIXME: implement this:
      // so files is a list of strings, no extra info on dir/file
      // convert files to resources and return
      // Maybe use this: https://www.npmjs.com/package/node-dir

      var resources: app.Resource[] = paths.map(p => {
        return {
          path: p,
          isTerminal: true // FIXME: todo actually classify these
        }
      });

      callback(error, resources);
    });
  }

  move(sourcePath: string, destinationPath: string, callback: app.Callback<void>) {
    fs.rename(sourcePath, destinationPath, callback);
  }

  /**
   * Asynchronously opens and reads from the file at the given path.
   *
   * @param path The file system path to read, relative to the root path.
   * @param callback Callback to invoke upon completion of the read operation.
   */
  read(path: string, callback: app.Callback<string>) {
    fs.readFile(this._getAbsolutePath(path), { encoding: 'utf8' }, (error: any, data: string) => {
      if (error) {
        // An error code of ENOENT indicates that the specified read failed because the file
        // doesn't exist.
        if (error.code == 'ENOENT') {
          // Return as a non-error state, but pass null to indicate the lack of data.
          return callback(null, null);
        } else {
          // Any other error types are surfaced to the caller.
          return callback(error);
        }
      } else {
        // Successful read. Return the data.
        callback(null, data);
        return;
      }
    });
  }

  /**
   * Asynchronously writes the given data string to the file referenced by the given path.
   *
   * @param path The file system path to write to, relative to the root path.
   * @param data The data string to write.
   * @param callback Callback to invoke upon completion of the write operation.
   */
  write(path: string, data: string, callback: app.Callback<void>) {
    fs.writeFile(this._getAbsolutePath(path), data, callback);
  }

  _getAbsolutePath (path: string) {
    return pathlib.join(this._storageRootPath, path);
  }
}
